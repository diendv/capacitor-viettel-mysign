// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorViettelMysign",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorViettelMysign",
            targets: ["MysignPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "MysignPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/MysignPlugin"),
        .testTarget(
            name: "MysignPluginTests",
            dependencies: ["MysignPlugin"],
            path: "ios/Tests/MysignPluginTests")
    ]
)