const { withAndroidManifest } = require('expo/config-plugins');

// Resolve o conflito de manifesto entre expo-secure-store e AppsFlyer (Android).
module.exports = function withAndroidManifestMerge(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    manifest.$['xmlns:tools'] = manifest.$['xmlns:tools'] || 'http://schemas.android.com/tools';

    const app = manifest.application[0];
    const current = app.$['tools:replace'] ? app.$['tools:replace'].split(',') : [];
    const needed = ['android:dataExtractionRules', 'android:fullBackupContent'];
    app.$['tools:replace'] = Array.from(new Set([...current, ...needed])).join(',');

    return cfg;
  });
};