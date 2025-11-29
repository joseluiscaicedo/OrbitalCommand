import ResourceCard from "../molecules/ResourceCard";
import type { ResourcesMap, ResourceKey, ResourceState } from "../../types";

interface Props {
  resources: ResourcesMap;
  onResupply: (type: ResourceKey) => void;
}

const ControlGrid = ({ resources, onResupply }: Props) => {
  const entries = Object.entries(resources) as [ResourceKey, ResourceState][];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {entries.map(([key, data]) => (
        <ResourceCard key={key} type={key} data={data} onResupply={onResupply} />
      ))}
    </div>
  );
};

export default ControlGrid;
