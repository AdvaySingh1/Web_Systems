/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuu96pv6a94grgs")

  // remove
  collection.schema.removeField("uf2bslxz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a0ixekmt",
    "name": "Img_Link",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yuu96pv6a94grgs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uf2bslxz",
    "name": "Img_Link",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // remove
  collection.schema.removeField("a0ixekmt")

  return dao.saveCollection(collection)
})
