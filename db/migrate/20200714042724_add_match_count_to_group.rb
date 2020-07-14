class AddMatchCountToGroup < ActiveRecord::Migration[6.0]
  def change
    add_column :groups, :match_number, :integer
  end
end
