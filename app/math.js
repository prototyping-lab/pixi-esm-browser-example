
export const cos = Math.cos;
export const sin = Math.sin;
export const PI = Math.PI;
export const random = Math.random;

export function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

export function norm(t, a, b) {
    return a + t * (b - a);
}

export function rand(min, max) {
    return norm(random(), min, max);
}

export function dist(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}
