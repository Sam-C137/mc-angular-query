import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "color",
    standalone: true,
})
export class ColorPipe implements PipeTransform {
    transform(shade: "lighter" | "darker" | "normal", amount?: number) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        let color = `#${randomColor}`;
        if (shade === "lighter") {
            color = this.lightenColor(color, amount || 20);
        } else if (shade === "darker") {
            color = this.darkenColor(color, amount || 20);
        }

        return color;
    }

    lightenColor(color: string, amount: number) {
        return this.changeColor(color, amount);
    }

    darkenColor(color: string, amount: number) {
        return this.changeColor(color, -amount);
    }

    changeColor(color: string, amount: number) {
        const num = parseInt(color.slice(1), 16);
        const r = (num >> 16) + amount;
        const b = ((num >> 8) & 0x00ff) + amount;
        const g = (num & 0x0000ff) + amount;

        const newColor = `#${this.componentToHex(r)}${this.componentToHex(
            b,
        )}${this.componentToHex(g)}`;
        return newColor;
    }

    componentToHex(c: number) {
        const hex = c.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }
}
