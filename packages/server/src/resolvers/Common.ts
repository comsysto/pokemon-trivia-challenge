import { Name } from "../api/SchemaTypes";

export function filterNamesByLanguages(names: Name[], languages: string[]) {
    return names.filter(({ language: { name } }) =>
        languages.map((language) => language.toLowerCase()).includes(name.toLowerCase().replace("-", "_"))
    );
}
