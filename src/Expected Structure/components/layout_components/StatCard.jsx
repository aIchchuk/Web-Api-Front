import React from 'react'
import { ListMusic } from 'lucide-react';


const StatCard = ({ icon: Icon, label, value, bgColor, iconColor }) => {
	return (
		<div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:bg-zinc-800/80 transition-colors">
			<div className="p-6">
				<div className="flex items-center gap-4">
					<div className={`p-3 rounded-lg ${bgColor}`}>
						<Icon className={`size-6 ${iconColor}`} />
					</div>
					<div>
						<p className="text-sm text-zinc-400">{label}</p>
						<p className="text-2xl font-bold">{value}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatCard;
