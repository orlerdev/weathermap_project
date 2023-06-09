export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomNumClouds = randomNumber(1, 8);
export const randomNumAtmosphere = randomNumber(1, 4);
export const randomNumNight = randomNumber(1, 14);
export const randomNumRain = randomNumber(1, 14);
export const randomNumSnow = randomNumber(1, 21);
export const randomNumClear = randomNumber(1, 18);
export const randomNumSunrise = randomNumber(1, 10);
export const randomNumSunset = randomNumber(1, 6);
export const randomNumStorm = randomNumber(1, 6);
