import { Terrain } from "../enums/terrain.js";
import Tile from "../objects/Tile.js";
import LocationType from "./locationType.js";

export default class GameMap {
  private name: string;
  private width: number;
  private height: number;
  private tiles: Tile[];
  private startingLocations: LocationType[];

  constructor(gameMapData: {
    name: string;
    width: number;
    height: number;
    tiles: { location: number[]; terrain: string }[];
    startingLocations: [number[]];
  }) {
    this.name = JSON.parse(JSON.stringify(gameMapData.name));
    this.width = JSON.parse(JSON.stringify(gameMapData.width));
    this.height = JSON.parse(JSON.stringify(gameMapData.height));
    this.tiles = new Array<Tile>();
    this.startingLocations = new Array<LocationType>();

    gameMapData.tiles.forEach(
      (element: { location: number[]; terrain: string }) => {
        let newTerrain: Terrain;
        switch (element.terrain) {
          case "plains":
            newTerrain = Terrain.Plains;
            break;
          case "steel ore":
            newTerrain = Terrain.SteelOre;
            break;
          case "crystal field":
            newTerrain = Terrain.CrystalField;
            break;
          default:
            newTerrain = Terrain.Plains;
            break;
        }
        this.tiles.push(
          new Tile(
            new LocationType(element.location[0], element.location[1]),
            newTerrain,
            null,
            null
          )
        );
      }
    );
    gameMapData.startingLocations.forEach((element: number[]) => {
      this.startingLocations.push(new LocationType(element[0], element[1]));
    });
  }

  public GetTiles(): Tile[] {
    return this.tiles;
  }
  public GetStartingLocations(): LocationType[] {
    return this.startingLocations;
  }
}
