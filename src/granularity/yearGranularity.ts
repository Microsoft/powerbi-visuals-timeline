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
import powerbiVisualsApi from "powerbi-visuals-api";

import { Calendar } from "../calendars/calendar";
import { ITimelineLabel } from "../dataInterfaces";
import { ITimelineDatePeriod } from "../datePeriod/datePeriod";
import { Utils } from "../utils";
import { GranularityBase } from "./granularityBase";
import { IGranularityRenderProps } from "./granularityRenderProps";
import { GranularityType } from "./granularityType";

export class YearGranularity extends GranularityBase {
    private localizationKey: string = "Visual_Granularity_Year";

    constructor(
        calendar: Calendar,
        locale: string,
        protected localizationManager: powerbiVisualsApi.extensibility.ILocalizationManager,
    ) {
        super(calendar, locale, Utils.GET_GRANULARITY_PROPS_BY_MARKER("Y"));
    }

    public getType(): GranularityType {
        return GranularityType.year;
    }

    public render(props: IGranularityRenderProps, isFirst: boolean): Selection<any, any, any, any> {
        if (!props.granularSettings.granularityYearVisibility) {
            return null;
        }

        return super.render(props, isFirst);
    }

    public splitDate(date: Date): (string | number)[] {

        const firstMonthOfYear = this.calendar.getFirstMonthOfYear();
        const firstDayOfYear = this.calendar.getFirstDayOfYear();
        const isOlympus = (firstMonthOfYear === 3 && firstDayOfYear === 1); 
        var year_number = this.calendar.determineYear(date);
        var year_string = "";
        if (isOlympus) {
            if (year_number <= 2020) {
                year_number = year_number - 2020 + 153;
                year_string = `${year_number}P`;
            } else {
                year_number = year_number + 1;
                year_string = `FY${year_number}`;
            }
        }
        return [isOlympus ? year_string : year_number];
    }

    public sameLabel(firstDatePeriod: ITimelineDatePeriod, secondDatePeriod: ITimelineDatePeriod): boolean {
        return firstDatePeriod.year === secondDatePeriod.year;
    }

    public generateLabel(datePeriod: ITimelineDatePeriod): ITimelineLabel {
        const localizedYear = this.localizationManager
            ? this.localizationManager.getDisplayName(this.localizationKey)
            : this.localizationKey;

        const firstMonthOfYear = this.calendar.getFirstMonthOfYear();
        const firstDayOfYear = this.calendar.getFirstDayOfYear();
        const isOlympus = (firstMonthOfYear === 3 && firstDayOfYear === 1); 
        var year_number = datePeriod.year;
        var year_string = "";

        if (isOlympus) {
            year_number = year_number - 1;
            if (year_number <= 2020) {
                year_number = year_number - 2020 + 153;
                year_string = `${year_number}P`;
            } else {
                year_number = year_number + 1;
                year_string = `FY${year_number}`;
            }
        } else {
            year_string = `${datePeriod.year}`;
        }

        return {
            id: datePeriod.index,
            text: year_string,
            title: `${localizedYear} ${year_string}`,
        };
    }
}
