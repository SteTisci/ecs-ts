export const Sprites = {
  player: null as HTMLImageElement | null,
  laserBlue: null as HTMLImageElement | null,
  blackSky: null as HTMLImageElement | null,
};

export async function loadSprites() {
  const load = (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      img.src = src;
    });
  };

  try {
    Sprites.player = await load('../assets/PNG/playerShip1_blue.png');
    Sprites.laserBlue = await load('../assets/PNG/Lasers/laserBlue01.png');
    Sprites.blackSky = await load('../assets/backgrounds/black.png');
  } catch (error) {
    console.error('Failed to load sprites:', error);
    throw error;
  }
}
