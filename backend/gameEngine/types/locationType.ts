export default class LocationType {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public GetX(): number {
    return this.x;
  }
  public GetY(): number {
    return this.y;
  }
  public GetLocation(): number[] {
    let location: number[];
    location.push(this.x);
    location.push(this.y);
    return location;
  }
  public SameLocation(locationToCompare: LocationType): boolean {
    if (
      this.x === locationToCompare.GetX() &&
      this.y === locationToCompare.GetY()
    )
      return true;
    else return false;
  }
  public DistanceFrom(locationToCompare: LocationType): number {
    return (
      Math.abs(this.x - locationToCompare.GetX()) +
      Math.abs(this.y - locationToCompare.GetY())
    );
  }
}
