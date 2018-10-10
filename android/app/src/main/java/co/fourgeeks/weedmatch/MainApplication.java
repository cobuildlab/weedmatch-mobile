package co.fourgeeks.weedmatch;

import android.app.Application;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.toast.RCTToastPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import com.toast.RCTToastPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // <-- Add this line
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line


import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        AppEventsLogger.activateApp(this);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new VectorIconsPackage(),
            new RCTToastPackage(),
            new RNSpinkitPackage(),
            new PickerViewPackage(),
            new PickerPackage(),
            new RNI18nPackage(),
            new RNFirebasePackage(),
            new FBSDKPackage(),
            new RNDeviceInfo(),
                    new RNFirebasePackage(),
                    new RNFirebaseNotificationsPackage(),
                    new RNFirebaseMessagingPackage(),
                    new RCTToastPackage(),
                    new RNSpinkitPackage(),
                    new PickerViewPackage(),
                    new PickerPackage(),
                    new RNI18nPackage(),
                    new RNDeviceInfo(),
                    new FBSDKPackage(mCallbackManager),
                    new RNFirebaseAnalyticsPackage(),
                    new RNFirebaseAuthPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
