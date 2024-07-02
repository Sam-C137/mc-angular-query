import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "color",
    standalone: true,
})
export class ColorPipe implements PipeTransform {
    transform(shade: "lighter" | "darker" | "normal", ammount?: number) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        let color = `#${randomColor}`;
        if (shade === "lighter") {
            color = this.lightenColor(color, ammount || 20);
        } else if (shade === "darker") {
            color = this.darkenColor(color, ammount || 20);
        }

        return color;
    }

    lightenColor(color: string, ammount: number) {
        return this.changeColor(color, ammount);
    }

    darkenColor(color: string, ammount: number) {
        return this.changeColor(color, -ammount);
    }

    changeColor(color: string, ammount: number) {
        const num = parseInt(color.slice(1), 16);
        const r = (num >> 16) + ammount;
        const b = ((num >> 8) & 0x00ff) + ammount;
        const g = (num & 0x0000ff) + ammount;

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
