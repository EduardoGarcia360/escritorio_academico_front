import { Preferences } from '@capacitor/preferences';

const capacitorStorage = {
  capacitorClearStorage: async () => {
    await Preferences.clear();
  },
  capacitorGetItem: async (key) => {
    const item = await Preferences.get({ key: key });
    return !item.value ? null : item.value;
  },
  capacitorSetItem: async (key, value) => {
    await Preferences.set({
      key: key,
      value: value,
    });
  },
};

export default capacitorStorage;
