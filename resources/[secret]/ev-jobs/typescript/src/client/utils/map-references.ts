export function mapReferences(pReferences: any) {
    const mappedReferences = new Map();

    pReferences.settings.cargo.forEach((c: any) => {
        if (!mappedReferences.has(c.origin.id)) {
            mappedReferences.set(c.origin.id, {
                type: "destination",
                name: pReferences.name,
                description: pReferences.description,
                objectives: [c.id],
                settings: {
                    location: {
                        type: c.origin.type,
                        reference: c.origin.id,
                    },
                    trigger: pReferences.settings.trigger,
                    marker: pReferences.settings.marker,
                    notification: pReferences.settings.notification
                },
            });
        } else {
            const cargo = mappedReferences.get(c.origin.id);
            if (cargo && !cargo.objectives.some((obj: any) => obj === cargo.id)) {
                cargo.objectives.push(cargo.id);
            }
        }
    });

    return mappedReferences;
}