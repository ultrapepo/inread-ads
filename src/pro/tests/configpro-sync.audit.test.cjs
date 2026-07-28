const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const report = JSON.parse(
  fs.readFileSync(path.join(root, 'artifacts/configpro-sync-report.json'), 'utf8'),
);
const source = fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8');
const pipTestSource = fs.readFileSync(
  path.join(root, 'tests/intext-pip.audit.test.cjs'),
  'utf8',
);

function walkJson(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walkJson(full));
    else if (
      entry.name.endsWith('.json')
      && !/(schema|fixture|backup|snapshot|test)/i.test(entry.name)
    ) {
      found.push(full);
    }
  }
  return found.sort();
}

const files = walkJson(path.join(root, 'configPro'));
const relative = (file) => path.relative(root, file).replaceAll('\\', '/');
const configs = new Map(
  files.map((file) => [relative(file), JSON.parse(fs.readFileSync(file, 'utf8'))]),
);
const general = (config) => config.intextSites?.default?.general;

function assertNoDuplicateJsonKeys(text, file) {
  let index = 0;
  const skip = () => {
    while (/\s/.test(text[index] || '')) index += 1;
  };
  const readString = () => {
    const start = index;
    assert.equal(text[index], '"', `${file}: string expected at ${index}`);
    index += 1;
    while (index < text.length) {
      if (text[index] === '\\') {
        index += 2;
      } else if (text[index] === '"') {
        index += 1;
        return JSON.parse(text.slice(start, index));
      } else {
        index += 1;
      }
    }
    assert.fail(`${file}: unterminated string`);
  };
  const readValue = () => {
    skip();
    if (text[index] === '{') {
      index += 1;
      skip();
      const keys = new Set();
      if (text[index] === '}') {
        index += 1;
        return;
      }
      while (index < text.length) {
        const key = readString();
        assert.ok(!keys.has(key), `${file}: duplicate key "${key}"`);
        keys.add(key);
        skip();
        assert.equal(text[index], ':', `${file}: colon expected at ${index}`);
        index += 1;
        readValue();
        skip();
        if (text[index] === '}') {
          index += 1;
          return;
        }
        assert.equal(text[index], ',', `${file}: comma expected at ${index}`);
        index += 1;
        skip();
      }
    } else if (text[index] === '[') {
      index += 1;
      skip();
      if (text[index] === ']') {
        index += 1;
        return;
      }
      while (index < text.length) {
        readValue();
        skip();
        if (text[index] === ']') {
          index += 1;
          return;
        }
        assert.equal(text[index], ',', `${file}: array comma expected at ${index}`);
        index += 1;
      }
    } else if (text[index] === '"') {
      readString();
    } else {
      const start = index;
      while (index < text.length && !/[\s,\]}]/.test(text[index])) index += 1;
      assert.ok(index > start, `${file}: value expected at ${index}`);
    }
  };
  readValue();
  skip();
  assert.equal(index, text.length, `${file}: trailing JSON content`);
}

test('1. todos los JSON reales parsean', () => {
  assert.equal(files.length, 12);
  for (const config of configs.values()) assert.ok(general(config));
});

test('2. no existen claves JSON duplicadas', () => {
  for (const file of files) {
    assertNoDuplicateJsonKeys(fs.readFileSync(file, 'utf8'), relative(file));
  }
});

test('3. cada cohorte común contiene seis valores únicos', () => {
  for (const config of configs.values()) {
    for (const site of Object.values(general(config).inclusions.sites)) {
      const values = site.keyValues.random1;
      assert.equal(values.length, 6);
      assert.equal(new Set(values).size, 6);
    }
  }
});

test('4. los valores de cohorte están entre 1 y 20', () => {
  for (const config of configs.values()) {
    for (const site of Object.values(general(config).inclusions.sites)) {
      site.keyValues.random1.forEach((value) => {
        assert.ok(Number(value) >= 1 && Number(value) <= 20);
      });
    }
  }
});

test('5. la cohorte representa exactamente el 30 por ciento', () => {
  for (const config of configs.values()) {
    for (const site of Object.values(general(config).inclusions.sites)) {
      assert.equal(site.keyValues.random1.length / 20, 0.3);
    }
  }
});

test('6. las variantes de vídeo referenciadas existen', () => {
  for (const config of configs.values()) {
    const video = general(config).video;
    for (const profile of Object.values(video.variantSelection.values)) {
      assert.ok(video.profiles[profile], `missing video profile ${profile}`);
    }
    assert.ok(video.profiles[video.variantSelection.fallback]);
  }
});

test('7. los slots de loading experiments son válidos', () => {
  for (const config of configs.values()) {
    const g = general(config);
    const slots = new Set(Object.keys(g.slotOverrides));
    for (const variant of Object.values(g.loadingExperiments.variants)) {
      Object.keys(variant.slots).forEach((slot) => assert.ok(slots.has(slot), slot));
    }
  }
});

test('8. los randoms extra 7-10 están presentes donde corresponde', () => {
  const expected = ['5', '6', '7', '8', '9', '10'];
  for (const config of configs.values()) {
    assert.deepEqual(Object.keys(general(config).video.variantSelection.values), expected);
  }
});

test('9. los bloques comunes obligatorios están presentes', () => {
  const required = [
    'fallbackBlankControl', 'loading', 'loadingExperiments', 'decision',
    'video', 'display', 'refreshCycle', 'slots', 'slotOverrides',
    'infiniteScroll', 'telemetry', 'contentTypes', 'networks', 'rules', 'dom',
  ];
  for (const config of configs.values()) {
    const g = general(config);
    required.forEach((key) => assert.ok(Object.hasOwn(g, key), key));
  }
});

test('10. los dominios de mobile no se copiaron a desktop', () => {
  for (const [file, config] of configs) {
    const domains = general(config).domainFilter.allowedDomains;
    if (file.endsWith('default_ES_desktop.json')) {
      assert.deepEqual(domains, ['telva', 'expansion', 'elmundo']);
    } else {
      assert.deepEqual(domains, ['telva', 'marca', 'expansion', 'elmundo']);
    }
  }
});

test('11. los ad unit paths permanecen en sus rutas protegidas', () => {
  for (const config of configs.values()) {
    assert.equal(general(config).display.adUnitPath, 'telva/belleza/n');
    assert.equal(general(config).video.adUnitPath, undefined);
  }
});

test('12. los network IDs propios se preservaron', () => {
  for (const config of configs.values()) {
    assert.deepEqual(Object.keys(general(config).networks), ['21626337071']);
  }
});

test('13. los selectores DOM propios se preservaron', () => {
  const expected = {
    articleBodySelector: '.ue-c-article__body',
    paragraphSelector: 'p',
    blockerSelector: '.ue-c-article__embed, .ue-c-article__image, .ue-c-ad',
  };
  for (const config of configs.values()) assert.deepEqual(general(config).dom, expected);
});

test('14. las exclusiones premium propias se preservaron', () => {
  for (const [file, config] of configs) {
    const keyValues = general(config).exclusions.keyValues;
    assert.deepEqual(
      { newsid: keyValues.newsid, tag: keyValues.tag, t: keyValues.t },
      { newsid: [''], tag: ['bloqueo-publi'], t: [''] },
    );
    if (file.includes('_mundo_')) {
      assert.deepEqual(keyValues.isPremium, ['1', 'true']);
    } else {
      assert.equal(keyValues.isPremium, undefined);
    }
  }
});

test('15. las configuraciones PNC desktop/mobile se preservaron', () => {
  for (const [file, config] of configs) {
    const margin = general(config).slotOverrides.pnc.loading.fetchRootMargin;
    assert.equal(margin, /_desktop\.json$/.test(file) ? '1100px 0px' : '1000px 0px');
    assert.equal(general(config).infiniteScroll.enabled, true);
  }
});

test('16. la ausencia de PIP propia de los JSON se preservó', () => {
  for (const config of configs.values()) {
    assert.equal(general(config).video.pip, undefined);
    for (const override of Object.values(general(config).slotOverrides)) {
      assert.equal(override.video?.pip, undefined);
    }
  }
});

test('17. PIP no se habilitó globalmente por accidente', () => {
  for (const config of configs.values()) {
    assert.notEqual(general(config).video.pip?.enabled, true);
  }
  assert.match(source, /enabled:\s*source\.enabled === true/);
  assert.match(source, /mode:\s*source\.mode === "floating" \? source\.mode : "floating"/);
});

test('18. los overrides PIP de la baseline siguen cubiertos', () => {
  assert.match(pipTestSource, /['"]gexp-intext['"]:\s*\{\s*video:\s*\{\s*pip:\s*\{\s*enabled:\s*true/);
  assert.match(pipTestSource, /['"]gexp-intext-2['"]:\s*\{\s*video:\s*\{\s*pip:\s*\{\s*enabled:\s*false/);
  assert.match(pipTestSource, /pnc:\s*\{\s*video:\s*\{\s*pip:\s*\{\s*enabled:\s*false/);
});

test('19. todos los JSON del inventario aparecen en el informe', () => {
  assert.deepEqual(
    [...report.files.map((entry) => entry.file)].sort(),
    [...configs.keys()].sort(),
  );
});

test('20. todos los JSON modificados aparecen como changed en el informe', () => {
  const reportedChanged = report.files.filter((entry) => entry.changed).map((entry) => entry.file);
  assert.deepEqual(reportedChanged, []);
  assert.ok(report.files.every((entry) => configs.has(entry.file)));
  assert.equal(report.pipBaselineProtected, true);
});
