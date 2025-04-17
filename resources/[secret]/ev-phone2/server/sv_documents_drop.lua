function droppedDocumentDestroy(pNoteId)
    return TriggerClientEvent("client:updateNotesRemove", -1, pNoteId)
end