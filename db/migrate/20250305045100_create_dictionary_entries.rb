class CreateDictionaryEntries < ActiveRecord::Migration[8.0]
  def change
    create_table :dictionary_entries do |t|
      t.string :term
      t.text :definition
      t.boolean :draft

      t.timestamps
    end
  end
end
