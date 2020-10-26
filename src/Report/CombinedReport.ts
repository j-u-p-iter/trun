import { TestSuiteReport } from "./TestSuiteReport";

export class CombinedReport {
  public duration: number;

  public numberOfTests: number;

  public numberOfFailedTests: number;

  public result: TestSuiteReport[];

  public addReport(report: TestSuiteReport): void {
    this.result.push(report);
  }
}
