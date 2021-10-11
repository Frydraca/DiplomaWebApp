import { ResourceType } from "../enums/resourceType.js";

export default class Resources {
  private energy: number;
  private steel: number;
  private roboSteel: number;
  private crystal: number;
  private energyCore: number;
  private credits: number;

  constructor(
    energy: number,
    steel: number,
    roboSteel: number,
    crystal: number,
    energyCore: number,
    credits: number
  ) {
    this.energy = energy;
    this.steel = steel;
    this.roboSteel = roboSteel;
    this.crystal = crystal;
    this.energyCore = energyCore;
    this.credits = credits;
  }

  Init(baseResources: Resources): void {
    this.energy = baseResources.GetEnergy();
    this.steel = baseResources.GetSteel();
    this.roboSteel = baseResources.GetRoboSteel();
    this.crystal = baseResources.GetCrystal();
    this.energyCore = baseResources.GetEnergyCore();
    this.credits = baseResources.GetCredits();
  }

  public HasMoreOrEqualThan(resourcesToCompare: Resources): boolean {
    if (
      this.energy >= resourcesToCompare.GetEnergy() &&
      this.steel >= resourcesToCompare.GetSteel() &&
      this.roboSteel >= resourcesToCompare.GetRoboSteel() &&
      this.crystal >= resourcesToCompare.GetCrystal() &&
      this.energyCore >= resourcesToCompare.GetEnergyCore() &&
      this.credits >= resourcesToCompare.GetCredits()
    )
      return true;
    else return false;
  }

  public Increase(resourceToIncreaseWith: Resources): void {
    this.energy += resourceToIncreaseWith.GetEnergy();
    this.steel += resourceToIncreaseWith.GetSteel();
    this.roboSteel += resourceToIncreaseWith.GetRoboSteel();
    this.crystal += resourceToIncreaseWith.GetCrystal();
    this.energyCore += resourceToIncreaseWith.GetEnergyCore();
    this.credits += resourceToIncreaseWith.GetCredits();
  }

  public Decrease(resourceToDecreaseWith: Resources): void {
    this.energy -= resourceToDecreaseWith.GetEnergy();
    this.steel -= resourceToDecreaseWith.GetSteel();
    this.roboSteel -= resourceToDecreaseWith.GetRoboSteel();
    this.crystal -= resourceToDecreaseWith.GetCrystal();
    this.energyCore -= resourceToDecreaseWith.GetEnergyCore();
    this.credits -= resourceToDecreaseWith.GetCredits();
  }

  public ModifyResource(resourceType: ResourceType, amount: number): void {
    switch (resourceType) {
      case ResourceType.Credits:
        this.credits += amount;
        break;
      case ResourceType.Crystal:
        this.crystal += amount;
        break;
      case ResourceType.Energy:
        this.energy += amount;
        break;
      case ResourceType.EnergyCore:
        this.energyCore += amount;
        break;
      case ResourceType.Steel:
        this.steel += amount;
        break;
      case ResourceType.RoboSteel:
        this.roboSteel += amount;
        break;
      default:
        break;
    }
  }
  public GetResource(resourceType: ResourceType): number {
    switch (resourceType) {
      case ResourceType.Credits:
        return this.credits;
      case ResourceType.Crystal:
        return this.crystal;
      case ResourceType.Energy:
        return this.energy;
      case ResourceType.EnergyCore:
        return this.energyCore;
      case ResourceType.Steel:
        return this.steel;
      case ResourceType.RoboSteel:
        return this.roboSteel;
      default:
        return 0;
    }
  }

  public GetEnergy(): number {
    return this.energy;
  }
  public GetSteel(): number {
    return this.steel;
  }
  public GetRoboSteel(): number {
    return this.roboSteel;
  }
  public GetCrystal(): number {
    return this.crystal;
  }
  public GetEnergyCore(): number {
    return this.energyCore;
  }
  public GetCredits(): number {
    return this.credits;
  }
  public IncreaseEnergy(value: number): void {
    this.energy += value;
  }
  public IncreaseSteel(value: number): void {
    this.steel += value;
  }
  public IncreaseRoboSteel(value: number): void {
    this.roboSteel += value;
  }
  public IncreaseCrystal(value: number): void {
    this.crystal += value;
  }
  public IncreaseEnergyCore(value: number): void {
    this.energyCore += value;
  }
  public IncreaseCredits(value: number): void {
    this.credits += value;
  }
  public DecreaseEnergy(value: number): void {
    this.energy -= value;
  }
  public DecreaseSteel(value: number): void {
    this.steel -= value;
  }
  public DecreaseRoboSteel(value: number): void {
    this.roboSteel -= value;
  }
  public DecreaseCrystal(value: number): void {
    this.crystal -= value;
  }
  public DecreaseEnergyCore(value: number): void {
    this.energyCore -= value;
  }
  public DecreaseCredits(value: number): void {
    this.credits -= value;
  }
}
