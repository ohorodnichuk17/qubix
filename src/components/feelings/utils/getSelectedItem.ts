const getSelectedItem = <T extends { name: string; emoji: string }>(
    selectedItem: T | undefined,
    itemsFromApi: T[],
): T | undefined => {
    if (!selectedItem) return undefined;

    const item = itemsFromApi.find((item) => item.name === selectedItem.name);

    if (item) {
        item.emoji = selectedItem.emoji;
        return item;
    }

    return undefined;
};

export default getSelectedItem;