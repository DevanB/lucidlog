require "application_system_test_case"

class DictionaryEntriesTest < ApplicationSystemTestCase
  setup do
    @dictionary_entry = dictionary_entries(:one)
  end

  test "visiting the index" do
    visit dictionary_entries_url
    assert_selector "h1", text: "Dictionary entries"
  end

  test "should create dictionary entry" do
    visit dictionary_entries_url
    click_on "New dictionary entry"

    fill_in "Definition", with: @dictionary_entry.definition
    check "Draft" if @dictionary_entry.draft
    fill_in "Term", with: @dictionary_entry.term
    click_on "Create Dictionary entry"

    assert_text "Dictionary entry was successfully created"
    click_on "Back"
  end

  test "should update Dictionary entry" do
    visit dictionary_entry_url(@dictionary_entry)
    click_on "Edit this dictionary entry", match: :first

    fill_in "Definition", with: @dictionary_entry.definition
    check "Draft" if @dictionary_entry.draft
    fill_in "Term", with: @dictionary_entry.term
    click_on "Update Dictionary entry"

    assert_text "Dictionary entry was successfully updated"
    click_on "Back"
  end

  test "should destroy Dictionary entry" do
    visit dictionary_entry_url(@dictionary_entry)
    click_on "Destroy this dictionary entry", match: :first

    assert_text "Dictionary entry was successfully destroyed"
  end
end
