import type { PropsWithChildren } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export type IDropdown = {
	readonly title: string;
};

export default function Dropdown({ title, children }: PropsWithChildren<IDropdown>) {
	return (
		<Accordion className="mb-2" collapsible type="single">
			<AccordionItem value="item-1">
				<AccordionTrigger>{title}</AccordionTrigger>
				<AccordionContent>{children}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
