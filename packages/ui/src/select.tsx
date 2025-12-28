import * as React from "react";
import { Select } from "@base-ui/react/select";

const grades = [
  { label: "Select grade", value: null },
  { label: "A1", value: "A1" },
  { label: "B2", value: "B2" },
  { label: "B3", value: "B3" },
  { label: "C4", value: "C4" },
  { label: "C5", value: "C5" },
  { label: "C6", value: "C6" },
  { label: "D7", value: "D7" },
  { label: "E8", value: "E8" },
  { label: "F9", value: "F9" },
];

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

export function GradeSelect() {
  return (
    <Select.Root items={grades} defaultValue={null}>
      <Select.Trigger
        className={`ui:flex ui:w-full ui:items-center ui:justify-between ui:gap-3 ui:data-placeholder:text-grey-300 ui:data-placeholder:italic ui:text-grey-500 ui:px-2 ui:text-sm ui:h-9 ui:hover:bg-zinc-100 ui:transition-all ui:duration-200 ui:ease-in-out data-[popup-open]:ui:bg-gray-50`}
      >
        <Select.Value />
        <Select.Icon className="flex">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          className="outline-none select-none z-10"
          sideOffset={0}
          alignItemWithTrigger={false}
        >
          <Select.Popup className="ui:min-w-(--anchor-width) ui:origin-(--transform-origin) ui:bg-clip-padding ui:outline ui:bg-white ui:outline-grey-100 ui:transition-[transform,scale,opacity] data-[ending-style]:ui:scale-90 data-[ending-style]:ui:opacity-0 data-[side=none]:ui:min-w-[calc(var(--anchor-width)+1rem)] data-[side=none]:data-[ending-style]:ui:transition-none data-[starting-style]:ui:scale-90 data-[starting-style]:ui:opacity-0 data-[side=none]:data-[starting-style]:ui:scale-100 data-[side=none]:data-[starting-style]:ui:opacity-100 data-[side=none]:data-[starting-style]:ui:transition-none">
            <Select.ScrollUpArrow className="ui:top-0 ui:z-1 ui:flex ui:h-4 ui:w-full ui:cursor-default ui:items-center ui:justify-center ui:rounded-md ui:bg-white ui:text-center ui:text-xs ui:before:absolute ui:before:top-full ui:before:left-0 ui:before:h-full ui:before:w-full ui:before:content-['']" />
            <Select.List className="ui:relative ui:scroll-py-6 ui:overflow-y-auto ui:max-h-(--available-height) ">
              {grades.map(({ label, value }) => (
                <Select.Item
                  key={label}
                  value={value}
                  className="ui:grid ui:cursor-default ui:border-b ui:border-zinc-100 ui:last:border-0 ui:hover:bg-primary/10 ui:data-selected:bg-primary ui:data-selected:text-white ui:grid-cols-[0.75rem_1fr] ui:items-center ui:gap-2 ui:py-2 ui:pr-4 ui:pl-2.5 ui:text-sm ui:h-9 ui:leading-4 ui:outline-none ui:select-none group-data-[side=none]:ui:pr-12 group-data-[side=none]:ui:text-base group-data-[side=none]:ui:leading-4 data-[highlighted]:ui:relative ui:highlighted:ui:z-0 ui:highlighted:ui:text-gray-50 ui:highlighted:before:ui:absolute ui:highlighted:before:ui:inset-x-1 ui:highlighted:before:ui:inset-y-0 ui:highlighted:before:ui:z-[-1] ui:highlighted:before:ui:rounded-sm ui:highlighted:before:bg-gray-900 pointer-coarse:ui:py-2.5 pointer-coarse:text-[0.925rem]"
                >
                  <Select.ItemIndicator className="ui:col-start-1">
                    <CheckIcon className="ui:size-3" />
                  </Select.ItemIndicator>
                  <Select.ItemText className="ui:col-start-2 ui:focus:ui:bg-zinc-100">
                    {label}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
            <Select.ScrollDownArrow className="ui:bottom-0 ui:z-1 ui:flex ui:h-4 ui:w-full ui:cursor-default ui:items-center ui:justify-center ui:rounded-md ui:bg-white ui:text-center ui:text-xs ui:before:absolute ui:before:bottom-full ui:before:left-0 ui:before:h-full ui:before:w-full ui:before:content-['']" />
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
