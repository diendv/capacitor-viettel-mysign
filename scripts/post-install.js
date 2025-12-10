// scripts/post-install.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('');
console.log('========================================');
console.log('  Mysign Plugin Post-Install');
console.log('========================================');
console.log('');

// Check if this is being installed in a project (not in plugin dev)
const isInProject = !__dirname.includes('capacitor-viettel-mysign');

if (!isInProject) {
  console.log('✓ Plugin development mode - skipping post-install');
  process.exit(0);
}

// Check Android SDK
const androidSdkPath = path.join(__dirname, '../android/libs/GoSignSDK.aar');
const androidExists = fs.existsSync(androidSdkPath);

console.log('📱 Android SDK:', androidExists ? '✓ Found' : '❌ Missing');

// Check iOS SDK
const iosLibsPath = path.join(__dirname, '../ios/libs');
const iosFrameworks = [
  'GoSignSDKLite.xcframework',
  'Alamofire.xcframework',
  'KeychainSwift.xcframework',
  'Moya.xcframework'
];

let iosCount = 0;
if (fs.existsSync(iosLibsPath)) {
  iosFrameworks.forEach(framework => {
    if (fs.existsSync(path.join(iosLibsPath, framework))) {
      iosCount++;
    }
  });
}

console.log('🍎 iOS SDK:', `${iosCount}/${iosFrameworks.length} frameworks found`);
console.log('');

// Show warnings if SDK missing
if (!androidExists || iosCount < iosFrameworks.length) {
  console.log('⚠️  IMPORTANT: SDK files are required!');
  console.log('');
  console.log('Please download Mysign SDK from:');
  console.log('https://drive.google.com/drive/folders/1rNG1ynIU2cRiAheftaW4H4rao4gtj7Zr');
  console.log('');
  
  if (!androidExists) {
    console.log('Android:');
    console.log(`  Place GoSignSDK.aar in: ${androidSdkPath}`);
    console.log('');
  }
  
  if (iosCount < iosFrameworks.length) {
    console.log('iOS:');
    console.log(`  Place frameworks in: ${iosLibsPath}/`);
    iosFrameworks.forEach(framework => {
      const exists = fs.existsSync(path.join(iosLibsPath, framework));
      console.log(`  ${exists ? '✓' : '❌'} ${framework}`);
    });
    console.log('');
  }
}

// Show next steps
console.log('Next steps:');
console.log('  1. npx cap sync');
console.log('  2. Configure in your app (see README.md)');
console.log('');
console.log('========================================');
console.log('');