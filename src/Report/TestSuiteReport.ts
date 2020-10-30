import { isDescribeBlock } from "../helpers";
import { TestSuite } from "../TestSuite";
import {
  ItBlock,
  ReportResultTree,
  TestBlock,
  TestBlockType,
  TestSuiteStatus
} from "../types";
import { ItReport } from "./ItReport";

export class TestSuiteReport {
  private generateReportTree(testBlocks: TestBlock[]): any {
    return testBlocks.map(testBlock => {
      if (isDescribeBlock(testBlock)) {
        return {
          title: testBlock.description,
          type: TestBlockType.DESCRIBE,
          children: this.generateReportTree(testBlock.children)
        };
      } else {
        return new ItReport(testBlock as ItBlock).generate();
      }
    });
  }

  private calculateDuration(items) {
    return items.reduce((resultDuration, child) => {
      if (child.children) {
        return this.calculateDuration(child.children);
      } else {
        return resultDuration + child.duration;
      }
    }, 0);
  }

  private calculateAmountOfTests(items) {
    return items.reduce((totalAmountOfTests, child) => {
      if (child.children) {
        return this.calculateAmountOfTests(child.children);
      } else {
        return totalAmountOfTests + 1;
      }
    }, 0);
  }

  constructor(public testSuite: TestSuite) {}

  public duration: number = 0;

  public status: TestSuiteStatus = TestSuiteStatus.RUNS;

  public testFilePath: string = "";

  public amountOfTests: number = 0;

  public numberOfFailedTests: number = 0;

  public tree: ReportResultTree = {
    title: "",
    children: []
  };

  public generate(): TestSuiteReport {
    this.status = this.testSuite.status;
    this.testFilePath = this.testSuite.testFilePath;

    if (
      this.status === TestSuiteStatus.PASSED ||
      this.status === TestSuiteStatus.FAILED
    ) {
      const rootTestsSuiteItem = [this.testSuite.getState().rootDescribeBlock];
      this.tree = this.generateReportTree(rootTestsSuiteItem)[0];

      this.amountOfTests = this.calculateAmountOfTests(rootTestsSuiteItem);

      this.duration = this.calculateDuration(this.tree.children);
    }

    return this;
  }
}
