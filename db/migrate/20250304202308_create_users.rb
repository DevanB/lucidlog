class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email_address, null: false
      t.string :password_digest, null: false
      t.datetime :email_verification_sent_at
      t.datetime :email_verified_at

      t.timestamps
    end
    add_index :users, :email_address, unique: true
  end
end
