
import { Project, ContributionZone } from './projects';

export interface GardenProject extends Project {
  tags: string[];
  impact_goal: string;
}

export interface GardenTask extends ContributionZone {
  zone_name: string;
}

export interface GardenOutput {
  id: string;
  task_id: string;
  encrypted_data: string;
  submitted_at: string;
}

export type GardenTaskType = 'site_layout' | 'plant_selection' | 'resource_list';

export interface SiteLayout {
  sketch_url: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'feet' | 'meters';
  };
  notes: string;
}

export interface PlantSelection {
  plants: Array<{
    name: string;
    quantity: number;
    season: 'spring' | 'summer' | 'fall' | 'winter' | 'perennial';
  }>;
  considerations: string;
}

export interface ResourceList {
  items: Array<{
    name: string;
    quantity: number;
    cost: number;
    source?: string;
  }>;
  total_cost: number;
  notes: string;
}
