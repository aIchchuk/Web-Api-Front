import { useEffect } from "react";
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatCard from "./StatCard";
import { useStat } from "../../hooks/useStat"; // adjust path as needed

const DashboardStat = () => {
	const { stat, fetchStat, isLoading } = useStat();

	useEffect(() => {
		fetchStat();
	}, []);

	const statsData = [
		{
			icon: ListMusic,
			label: "Total Songs",
			value: stat.totalSong?.toString() || "0",
			bgColor: "bg-emerald-500/10",
			iconColor: "text-emerald-500",
		},
		{
			icon: Library,
			label: "Total Albums",
			value: stat.totalAlbum?.toString() || "0",
			bgColor: "bg-violet-500/10",
			iconColor: "text-violet-500",
		},
		{
			icon: Users2,
			label: "Total Artists",
			value: stat.totalArtist?.toString() || "0",
			bgColor: "bg-orange-500/10",
			iconColor: "text-orange-500",
		},
		{
			icon: PlayCircle,
			label: "Total Users",
			value: stat.totalUser?.toLocaleString() || "0",
			bgColor: "bg-sky-500/10",
			iconColor: "text-sky-500",
		},
	];

	if (isLoading) {
		return <p className="text-zinc-400">Loading stats...</p>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-1">
			{statsData.map((stat) => (
				<StatCard
					key={stat.label}
					icon={stat.icon}
					label={stat.label}
					value={stat.value}
					bgColor={stat.bgColor}
					iconColor={stat.iconColor}
				/>
			))}
		</div>
	);
};

export default DashboardStat;
