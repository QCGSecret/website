import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, AlertTriangle, Flame, Info } from 'lucide-react'
import type { PropsWithChildren } from 'react'

export type IAlert = {
	readonly title?: string | undefined
	readonly type: 'danger' | 'info' | 'success' | 'warning'
}

function resolveType(type: IAlert['type']) {
	switch (type) {
		case 'success':
			return {
				icon: <Flame className="h-4 w-4" />,
			}
		case 'danger':
			return {
				icon: <AlertTriangle className="h-4 w-4" />,
			}
		case 'info':
			return {
				icon: <Info className="h-4 w-4" />,
			}
		case 'warning':
			return {
				icon: <AlertCircle className="h-4 w-4" />,
			}
	}
}

export default function GuideAlert({ title, type, children }: PropsWithChildren<IAlert>) {
	const { icon } = resolveType(type)

	return (
		<Alert className="mt-2 mb-2">
			{icon}
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	)
}
