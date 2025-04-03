
import { GardenTaskType } from '@/types/garden';

export interface GardenTemplate {
  name: string;
  description: string;
  impact_goal: string;
  tags: string[];
  zones: Array<{
    name: string;
    type: GardenTaskType;
    task_description: string;
    expected_outputs: string;
  }>;
}

export const communityGardenTemplate: GardenTemplate = {
  name: "Green Haven Community Garden",
  description: "A collaborative project to create a sustainable community garden that produces fresh vegetables and brings neighbors together.",
  impact_goal: "Create a sustainable food source for the community while reducing carbon footprint through local produce.",
  tags: ["sustainable", "garden", "community", "food", "local"],
  zones: [
    {
      name: "Site Layout",
      type: "site_layout",
      task_description: "Create a layout for the garden including dimensions, bed placements, and water access points.",
      expected_outputs: "A sketch or diagram of the garden layout with dimensions and key features marked."
    },
    {
      name: "Plant Selection",
      type: "plant_selection",
      task_description: "Research and select plants that will thrive in our local climate and provide a good mix of vegetables, herbs, and flowers.",
      expected_outputs: "A list of recommended plants including varieties, quantities, and planting seasons."
    },
    {
      name: "Resource List",
      type: "resource_list",
      task_description: "Compile a list of resources needed to establish the garden including tools, materials, and estimated costs.",
      expected_outputs: "An itemized list of required resources with quantities and cost estimates."
    }
  ]
};

export const gardenTemplates = [
  communityGardenTemplate,
  // Additional templates could be added here
];
