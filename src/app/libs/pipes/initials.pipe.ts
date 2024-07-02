import { Pipe, PipeTransform } from "@angular/core";
import { Optional } from "@types";

@Pipe({
    name: "initials",
    standalone: true,
})
export class InitialsPipe implements PipeTransform {
    transform(name: Optional<string>): unknown {
        if (!name) {
            return "NU";
        }
        const firstName = name.split(" ")[0];
        const lastName = name.split(" ")[1];

        return `${firstName[0].toUpperCase()}${
            lastName[0].toUpperCase() || ""
        }`;
    }
}
