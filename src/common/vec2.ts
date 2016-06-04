
export class vec2 {

    private values = new Float32Array(2);

    get x(): number {
        return this.values[0];
    }

    get y(): number {
        return this.values[1];
    }

    get xy(): number[] {
        return [
            this.values[0],
            this.values[1]
        ];
    }

    set x(value: number) {
        this.values[0] = value;
    }

    set y(value: number) {
        this.values[1] = value;
    }

    set xy(values: number[]) {
        this.values[0] = values[0];
        this.values[1] = values[1];
    }

    constructor(values: number[] = null) {
        if (values) {
            this.xy = values;
        }
    }

    at(index: number): number {
        return this.values[index];
    }

    reset(): void {
        this.x = 0;
        this.y = 0;
    }

    copy(dest: vec2 = null): vec2 {
        if (!dest) dest = new vec2();

        dest.x = this.x;
        dest.y = this.y;

        return dest;
    }

    negate(dest: vec2 = null): vec2 {
        if (!dest) dest = this;

        dest.x = -this.x;
        dest.y = -this.y;

        return dest;
    }

    equals(vector: vec2): boolean {
        return this.x === vector.x && this.y == vector.y;
    }

    length(): number {
        return Math.sqrt(this.squaredLength());
    }

    squaredLength(): number {
        var x = this.x,
            y = this.y;

        return (x * x + y * y);
    }

    add(vector: vec2): vec2 {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    subtract(vector: vec2): vec2 {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    }

    multiply(vector: vec2): vec2 {
        this.x *= vector.x;
        this.y *= vector.y;

        return this;
    }

    divide(vector: vec2): vec2 {
        this.x /= vector.x;
        this.y /= vector.y;

        return this;
    }

    scale(value: number, dest: vec2 = null): vec2 {
        if (!dest) dest = this;

        dest.x *= value;
        dest.y *= value;

        return dest;
    }

    normalize(dest: vec2 = null): vec2 {
        if (!dest) dest = this;

        var length = this.length();

        if (length === 1) {
            return this;
        }

        if (length === 0) {
            dest.x = 0;
            dest.y = 0;

            return dest;
        }

        length = 1.0 / length;

        dest.x *= length;
        dest.y *= length;

        return dest;
    }

    static dot(vector: vec2, vector2: vec2): number {
        return (vector.x * vector2.x + vector.y * vector2.y);
    }

    static distance(vector: vec2, vector2: vec2): number {
        return Math.sqrt(this.squaredDistance(vector, vector2));
    }

    static squaredDistance(vector: vec2, vector2: vec2): number {
        var x = vector2.x - vector.x,
            y = vector2.y - vector.y;

        return (x * x + y * y);
    }

    static direction(vector: vec2, vector2: vec2, dest: vec2 = null): vec2 {
        if (!dest) dest = new vec2();

        var x = vector.x - vector2.x,
            y = vector.y - vector2.y;

        var length = Math.sqrt(x * x + y * y);

        if (length === 0) {
            dest.x = 0;
            dest.y = 0;

            return dest;
        }

        length = 1 / length;

        dest.x = x * length;
        dest.y = y * length;

        return dest;
    }

    static mix(vector: vec2, vector2: vec2, time: number, dest: vec2 = null): vec2 {
        if (!dest) dest = new vec2();

        var x = vector.x,
            y = vector.y;

        var x2 = vector2.x,
            y2 = vector2.y;

        dest.x = x + time * (x2 - x);
        dest.y = y + time * (y2 - y);

        return dest;
    }

    static sum(vector: vec2, vector2: vec2, dest: vec2 = null): vec2 {
        if (!dest) dest = new vec2();

        dest.x = vector.x + vector2.x;
        dest.y = vector.y + vector2.y;

        return dest;
    }

    static difference(vector: vec2, vector2: vec2, dest: vec2 = null): vec2 {
        if (!dest) dest = new vec2();

        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;

        return dest;
    }

    static product(vector: vec2, vector2: vec2, dest: vec2 = null): vec2 {
        if (!dest) dest = new vec2();

        dest.x = vector.x * vector2.x;
        dest.y = vector.y * vector2.y;

        return dest;
    }

    static quotient(vector: vec2, vector2: vec2, dest: vec2 = null): vec2 {
        if (!dest) dest = new vec2();

        dest.x = vector.x / vector2.x;
        dest.y = vector.y / vector2.y;

        return dest;
    }

    static zero = new vec2([0, 0]);

}

export function v2(x = 0, y = 0): vec2 {
    return new vec2([x, y]);
}
