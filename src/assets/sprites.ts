export const Sprites = {
  player: null as HTMLImageElement | null,
  laserBlue: null as HTMLImageElement | null,
};

export async function loadSprites() {
  const load = (src: string) => {
    return new Promise<HTMLImageElement>(resolve => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.src = src;
    });
  };

  Sprites.player = await load('../PNG/playerShip1_blue.png');
  Sprites.laserBlue = await load('../PNG/Lasers/laserBlue01.png');
}
