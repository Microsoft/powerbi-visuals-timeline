/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import { Selection } from "d3-selection";

import { Granularity } from "../src/granularity/granularity";
import { GranularityType } from "../src/granularity/granularityType";
import { GranularityRenderProps } from "../src/granularity/granularityRenderProps";
import { ITimelineDatePeriod } from "../src/datePeriod/datePeriod";

import {
    ExtendedLabel,
    TimelineLabel,
} from "../src/dataInterfaces";

export class TimelineGranularityMock implements Granularity {
    private datePeriod: ITimelineDatePeriod[];

    constructor(datePeriod: ITimelineDatePeriod[] = []) {
        this.datePeriod = datePeriod;
    }

    public setDatePeriod(datePeriod: ITimelineDatePeriod[]): void {
        this.datePeriod = datePeriod;
    }

    public getType(): GranularityType {
        return GranularityType.day;
    }

    public splitDate(date: Date): (string | number)[] {
        return [0];
    }

    public getDatePeriods(): ITimelineDatePeriod[] {
        return this.datePeriod;
    }

    public resetDatePeriods(): void { }

    public getExtendedLabel(): ExtendedLabel {
        return null;
    }

    public setExtendedLabel(extendedLabel: ExtendedLabel): void { }

    public createLabels(granularity: Granularity): TimelineLabel[] {
        return [];
    }

    public sameLabel(
        firstDatePeriod: ITimelineDatePeriod,
        secondDatePeriod: ITimelineDatePeriod
    ): boolean {
        return false;
    }

    public generateLabel(datePeriod: ITimelineDatePeriod): TimelineLabel {
        return null;
    }

    public addDate(date: Date) { }

    public setNewEndDate(date: Date): void { }

    public splitPeriod(index: number, newFraction: number, newDate: Date): void { }

    public splitDateForTitle(date: Date): (string | number)[] {
        return [];
    }

    public render(
        props: GranularityRenderProps,
        isFirst: boolean
    ): Selection<any, any, any, any> {
        return null;
    }
}
