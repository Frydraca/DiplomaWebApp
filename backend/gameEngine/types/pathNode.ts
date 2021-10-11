import Tile from "../objects/Tile.js";

export default class PathNode {
  private tile: Tile;
  private parent: PathNode;
  private f: number;
  private g: number;
  private h: number;

  constructor(tile: Tile, parent: PathNode, f: number, g: number, h: number) {
    this.tile = tile;
    this.parent = parent;
    this.f = f;
    this.g = g;
    this.h = h;
  }

  public GetTile(): Tile {
    return this.tile;
  }
  public SetTile(tile: Tile): void {
    this.tile = tile;
  }
  public GetParent(): PathNode {
    return this.parent;
  }
  public SetParent(parent: PathNode): void {
    this.parent = parent;
  }
  public GetF(): number {
    return this.f;
  }
  public SetF(f: number): void {
    this.f = f;
  }
  public GetG(): number {
    return this.g;
  }
  public SetG(g: number): void {
    this.g = g;
  }
  public GetH(): number {
    return this.h;
  }
  public SetH(h: number): void {
    this.h = h;
  }
}
