

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Verifying Mysign Plugin Installation...\n');

// Check if installed in a Capacitor project
const capacitorConfigPath = path.join(process.cwd(), 'capacitor.config.ts');
const isCapacitorProject = fs.existsSync(capacitorConfigPath);

if (!isCapacitorProject) {
  console.log('❌ Not a Capacitor project');
  process.exit(1);
}

console.log('✓ Capacitor project detected\n');

// Check plugin in node_modules
const pluginPath = path.join(process.cwd(), 'node_modules/capacitor-mysign-plugin');
const pluginExists = fs.existsSync(pluginPath);

console.log('Plugin installation:', pluginExists ? '✓' : '❌');

if (pluginExists) {
  // Check Android
  const androidPluginPath = path.join(process.cwd(), 'android/capacitor-cordova-android-plugins');
  console.log('Android plugin linked:', fs.existsSync(androidPluginPath) ? '✓' : '❌');
  
  // Check iOS
  const iosPodfilePath = path.join(process.cwd(), 'ios/App/Podfile');
  if (fs.existsSync(iosPodfilePath)) {
    const podfile = fs.readFileSync(iosPodfilePath, 'utf8');
    const hasPlugin = podfile.includes('CapacitorMysign');
    console.log('iOS plugin linked:', hasPlugin ? '✓' : '❌');
  }
}

console.log('\nTo sync plugin with native projects, run:');
console.log('  npx cap sync\n');