/**
 * @file Declares Location data type to represent user's location.
 */

/**
 * @typedef Location Represents user's location
 * @property {number} latitude latitude
 * @property {number} longitude longitude
 */

export default interface Location {
    latitude: number;
    longitude: number;
}
