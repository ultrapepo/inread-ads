using System;using System.Collections.Generic;using System.Runtime.InteropServices;
[ComImport,Guid("44AE0FA8-EA31-4109-8D2E-4CAE4997C555"),InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] interface MT {
 void F0();void F1();void F2();void F3();void F4();[PreserveSig]int GetUINT64(ref Guid key,out ulong value);
 void F6();void F7();void F8();void F9();void F10();void F11();void F12();void F13();void F14();void F15();void F16();void F17();void F18();void F19();void F20();
 [PreserveSig]int SetGUID(ref Guid key,ref Guid value);
}
[ComImport,Guid("70AE66F2-C809-4E4F-8915-BDCB406B7993"),InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] interface Reader{
 void GetStreamSelection();void SetStreamSelection();void GetNativeMediaType();[PreserveSig]int GetCurrentMediaType(int stream,out MT type);
 [PreserveSig]int SetCurrentMediaType(int stream,IntPtr reserved,MT type);void SetCurrentPosition();
 [PreserveSig]int ReadSample(int stream,int control,out int actual,out int flags,out long timestamp,[MarshalAs(UnmanagedType.IUnknown)]out object sample);
}
[ComImport,Guid("C40A00F2-B93A-4D80-AE8C-5A1C634F58E4"),InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] interface Sample{
 void F0();void F1();void F2();void F3();void F4();void F5();void F6();void F7();void F8();void F9();void F10();void F11();void F12();void F13();void F14();void F15();void F16();void F17();void F18();void F19();void F20();void F21();void F22();void F23();void F24();void F25();void F26();void F27();void F28();void F29();void F30();void F31();void F32();void F33();
 [PreserveSig]int GetSampleDuration(out long duration);void F35();void F36();void F37();
 [PreserveSig]int ConvertToContiguousBuffer(out MediaBuffer buffer);
}
[ComImport,Guid("045FA593-8799-42B8-BC8D-8968C6453507"),InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] interface MediaBuffer{
 [PreserveSig]int Lock(out IntPtr bytes,out int max,out int length);[PreserveSig]int Unlock();
}
class Decode{
 [DllImport("mfplat.dll",ExactSpelling=true)]static extern int MFStartup(int version,int flags);
 [DllImport("mfplat.dll",ExactSpelling=true)]static extern int MFShutdown();
 [DllImport("mfplat.dll",ExactSpelling=true)]static extern int MFCreateMediaType(out MT type);
 [DllImport("mfreadwrite.dll",CharSet=CharSet.Unicode,ExactSpelling=true)]static extern int MFCreateSourceReaderFromURL(string file,IntPtr attributes,out Reader reader);
 static void Check(int hr){Marshal.ThrowExceptionForHR(hr);}
 static Guid G(string value){return new Guid(value);}
 [STAThread]static int Main(string[] args){Reader reader=null;MT type=null,current=null;bool startup=false;
  try{Check(MFStartup(0x20070,0));startup=true;Check(MFCreateSourceReaderFromURL(System.IO.Path.GetFullPath(args[0]),IntPtr.Zero,out reader));
   Check(MFCreateMediaType(out type));Guid major=G("48eba18e-f8c9-4687-bf11-0a74c9f96a8f"),video=G("73646976-0000-0010-8000-00aa00389b71"),sub=G("f7e34c9a-42e8-4714-b74b-cb29d72c35e5"),nv12=G("3231564e-0000-0010-8000-00aa00389b71");
   Check(type.SetGUID(ref major,ref video));Check(type.SetGUID(ref sub,ref nv12));Check(reader.SetCurrentMediaType(-4,IntPtr.Zero,type));
   int frames=0,decodedBytes=0;bool eos=false,black=true;List<long> pts=new List<long>(),durations=new List<long>();
   for(int i=0;i<128;i++){int actual,flags;long timestamp;object sample;Check(reader.ReadSample(-4,0,out actual,out flags,out timestamp,out sample));
    if((flags&1)!=0)throw new Exception("Source reader error flag");if(sample!=null){frames++;long duration;Check(((Sample)sample).GetSampleDuration(out duration));pts.Add(timestamp);durations.Add(duration);
     MediaBuffer buffer;Check(((Sample)sample).ConvertToContiguousBuffer(out buffer));
     try{IntPtr bytes;int max,length;Check(buffer.Lock(out bytes,out max,out length));try{byte[] pixels=new byte[length];Marshal.Copy(bytes,pixels,0,length);decodedBytes+=length;
       if(length!=6144)black=false;for(int pixel=0;pixel<length;pixel++)if(pixels[pixel]!=(pixel<4096?16:128))black=false;
      }finally{Check(buffer.Unlock());}}finally{Marshal.FinalReleaseComObject(buffer);Marshal.FinalReleaseComObject(sample);}}
    if((flags&2)!=0){eos=true;break;}}
   Check(reader.GetCurrentMediaType(-4,out current));Guid sizeKey=G("1652c33d-d6b2-4012-b834-72030849a37d");ulong size;Check(current.GetUINT64(ref sizeKey,out size));
   bool timingValid=frames==25;for(int i=0;i<pts.Count;i++)if(pts[i]!=i*400000L||durations[i]!=400000L)timingValid=false;
   Console.WriteLine("{\"decoder\":\"Windows Media Foundation H264 to NV12\",\"frames\":"+frames+",\"eos\":"+eos.ToString().ToLower()+",\"width\":"+(size>>32)+",\"height\":"+(size&0xffffffff)+",\"decodedBytes\":"+decodedBytes+",\"expectedBlackPixels\":"+black.ToString().ToLower()+",\"pts100ns\":["+String.Join(",",pts)+"],\"durations100ns\":["+String.Join(",",durations)+"],\"timingValid\":"+timingValid.ToString().ToLower()+"}");
   return frames==25&&eos&&black&&decodedBytes==25*6144&&timingValid?0:2;
  }catch(Exception e){Console.Error.WriteLine(e.ToString());return 1;}
  finally{if(current!=null)Marshal.FinalReleaseComObject(current);if(type!=null)Marshal.FinalReleaseComObject(type);if(reader!=null)Marshal.FinalReleaseComObject(reader);if(startup)MFShutdown();}
 }
}
