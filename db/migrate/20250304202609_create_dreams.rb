class CreateDreams < ActiveRecord::Migration[8.0]
  def change
    create_table :dreams do |t|
      t.string :title
      t.text :body
      t.date :dream_date

      t.timestamps
    end
  end
end
