/**
 * An interface for JSON structure
 */
export interface JSONStructure {
    id: string,
    name: string,
    children?: JSONStructure[],
    [key: string]: any,
}
