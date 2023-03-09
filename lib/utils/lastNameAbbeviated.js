export function lastNameAbbeviated(name) {
    const nameSprited = name.toLowerCase().trim().split(' ');
    const last = nameSprited.length > 1 ? `${nameSprited[nameSprited.length - 1].charAt(0).toUpperCase()}.` : '';
    return `${nameSprited[0].charAt(0).toUpperCase()}${nameSprited[0].slice(1)} ${last}`;
}
