export const PWA_HOST = "head.byted.org.cn";
export const PWA_ICON_REV = "headplane-png-icons-20260619";
export const PWA_SPLASH_REV = "headplane-ios-splash-20260620b";
export const PWA_DEFAULT_VIEWPORT = "width=device-width, initial-scale=1";
export const PWA_LOCKED_VIEWPORT =
  "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";

type IosSplashDevice = {
  deviceWidth: number;
  deviceHeight: number;
  pixelRatio: number;
};

const IOS_SPLASH_DEVICES: IosSplashDevice[] = [
  { deviceWidth: 320, deviceHeight: 568, pixelRatio: 2 },
  { deviceWidth: 375, deviceHeight: 667, pixelRatio: 2 },
  { deviceWidth: 414, deviceHeight: 896, pixelRatio: 2 },
  { deviceWidth: 375, deviceHeight: 812, pixelRatio: 3 },
  { deviceWidth: 390, deviceHeight: 844, pixelRatio: 3 },
  { deviceWidth: 393, deviceHeight: 852, pixelRatio: 3 },
  { deviceWidth: 402, deviceHeight: 874, pixelRatio: 3 },
  { deviceWidth: 414, deviceHeight: 896, pixelRatio: 3 },
  { deviceWidth: 428, deviceHeight: 926, pixelRatio: 3 },
  { deviceWidth: 430, deviceHeight: 932, pixelRatio: 3 },
  { deviceWidth: 440, deviceHeight: 956, pixelRatio: 3 },
  { deviceWidth: 768, deviceHeight: 1024, pixelRatio: 2 },
  { deviceWidth: 810, deviceHeight: 1080, pixelRatio: 2 },
  { deviceWidth: 834, deviceHeight: 1112, pixelRatio: 2 },
  { deviceWidth: 834, deviceHeight: 1194, pixelRatio: 2 },
  { deviceWidth: 1024, deviceHeight: 1366, pixelRatio: 2 },
];

function iosSplashScreen(device: IosSplashDevice, orientation: "portrait" | "landscape") {
  const imageWidth =
    orientation === "portrait"
      ? device.deviceWidth * device.pixelRatio
      : device.deviceHeight * device.pixelRatio;
  const imageHeight =
    orientation === "portrait"
      ? device.deviceHeight * device.pixelRatio
      : device.deviceWidth * device.pixelRatio;

  return {
    file: `pwa-splash-${imageWidth}x${imageHeight}.png`,
    media:
      `screen and (device-width: ${device.deviceWidth}px) ` +
      `and (device-height: ${device.deviceHeight}px) ` +
      `and (-webkit-device-pixel-ratio: ${device.pixelRatio}) ` +
      `and (orientation: ${orientation})`,
  };
}

export const PWA_SPLASH_SCREENS = IOS_SPLASH_DEVICES.flatMap((device) => [
  iosSplashScreen(device, "portrait"),
  iosSplashScreen(device, "landscape"),
]);

export function isPwaHost(request: Request) {
  return new URL(request.url).hostname.toLowerCase() === PWA_HOST;
}

export function isPwaUiRequest(request: Request) {
  if (!isPwaHost(request)) {
    return false;
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  return /\b(iPhone|iPad|iPod|Android|Mobile)\b/i.test(userAgent);
}
