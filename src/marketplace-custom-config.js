/*
 * Marketplace specific configuration.
 */

export const postCategories = [
  {
    key: 'Adventure',
    label: 'Adventure',
  },
  {
    key: 'Art',
    label: 'Art',
  },
  {
    key: 'Beauty',
    label: 'Beauty',
  },
  {
    key: 'Fashion',
    label: 'Fashion',
  },
  {
    key: 'Food',
    label: 'Food',
  },
  {
    key: 'Health',
    label: 'Health',
  },
  {
    key: 'Home',
    label: 'Home',
  },
  {
    key: 'Ideas',
    label: 'Ideas',
  },
  {
    key: 'Lifestyle',
    label: 'Lifestyle',
  },
  {
    key: 'Politics',
    label: 'Politics',
  },
  {
    key: 'Sports',
    label: 'Sports',
  },
  {
    key: 'Technology',
    label: 'Technology',
  },
];

export const socialMedias = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'snapchat', label: 'Snapchat' },
  { key: 'vsco', label: 'Vsco' },
  { key: 'pinterest', label: 'Pinterest' },
  { key: 'linkedIn', label: 'LinkedIn' },
  { key: 'podcast', label: 'Podcast' },
  { key: 'tiktok', label: 'Tiktok' },
  { key: 'youtube', label: 'Youtube' },
  { key: 'vimeo', label: 'Vimeo' },
  { key: 'twitch', label: 'Twitch' },
  { key: 'blog', label: 'Blog' },
];

export const categories = [
  { key: 'smoke', label: 'Smoke' },
  { key: 'electric', label: 'Electric' },
  { key: 'wood', label: 'Wood' },
  { key: 'other', label: 'Other' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 100000,
  step: 5,
};

// Follower filter configuration
export const followerFilterConfig = {
  min: 0,
  max: 1000000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
