require "application_system_test_case"

class MarketingPagesTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit root_url
    assert_selector "h1", text: "Let's get started"
  end
end
