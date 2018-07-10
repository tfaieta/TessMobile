package com.tess;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.tanguyantoine.react.MusicControl;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativenavigation.NavigationApplication;
import com.brentvatne.react.ReactVideoPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.evollu.react.fa.FIRAnalyticsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ShareApplication  {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNSoundPackage(),
        new ReactNativeAudioPackage(),
        new VectorIconsPackage(),
        new LinearGradientPackage(),
        new MusicControl(),
        new RNFetchBlobPackage(),
        new ReactVideoPackage(),
        new RNSharePackage(),
        new FIRAnalyticsPackage(),
        new PickerPackage()
    );
  }


  @Override
  public String getFileProviderAuthority() {
    return "com.tess.provider";
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public String getJSMainModuleName() {
    return "index.android";
  }

}
