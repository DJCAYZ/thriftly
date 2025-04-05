import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import { ExpenseOverview } from "@/types";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
    amount: {
        label: 'Amount',
    },
}

export default function ExpenseOverviewChart({
    expenseOverview,
}: { expenseOverview: ExpenseOverview[] }) {

    const totalAmount = expenseOverview.reduce((total: number, current): number => {
        return total + current.amount;
    }, 0);

    const chartData = expenseOverview.map((category, index) => {
        return { 'fill': `hsl(var(--chart-${index+1}))`, ...category }
    })
    return (
        <ChartContainer config={chartConfig}>
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />} 
                />
                <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="title"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                            <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-xl font-bold"
                                >
                                {totalAmount.toLocaleString("en-US", {style: 'currency', currency: "PHP"})}
                                </tspan>

                                <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                                >
                                Total Expense
                                </tspan>
                            </text>
                            );
                        }}}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}
