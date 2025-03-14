class DictionaryEntriesController < ApplicationController
  allow_unauthenticated_access only: %i[index show]
  before_action :resume_session, only: %i[index show]
  before_action :set_dictionary_entry, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /dictionary_entries
  def index
    @dictionary_entries = DictionaryEntry.all
    render inertia: "DictionaryEntry/Index", props: {
      dictionary_entries: @dictionary_entries.map do |dictionary_entry|
        serialize_dictionary_entry(dictionary_entry)
      end
    }
  end

  # GET /dictionary_entries/1
  def show
    render inertia: "DictionaryEntry/Show", props: {
      dictionary_entry: serialize_dictionary_entry(@dictionary_entry)
    }
  end

  # GET /dictionary_entries/new
  def new
    @dictionary_entry = DictionaryEntry.new
    render inertia: "DictionaryEntry/New", props: {
      dictionary_entry: serialize_dictionary_entry(@dictionary_entry)
    }
  end

  # GET /dictionary_entries/1/edit
  def edit
    render inertia: "DictionaryEntry/Edit", props: {
      dictionary_entry: serialize_dictionary_entry(@dictionary_entry)
    }
  end

  # POST /dictionary_entries
  def create
    @dictionary_entry = DictionaryEntry.new(dictionary_entry_params)

    if @dictionary_entry.save
      redirect_to @dictionary_entry, notice: "Dictionary entry was successfully created."
    else
      redirect_to new_dictionary_entry_url, inertia: { errors: @dictionary_entry.errors }
    end
  end

  # PATCH/PUT /dictionary_entries/1
  def update
    if @dictionary_entry.update(dictionary_entry_params)
      redirect_to @dictionary_entry, notice: "Dictionary entry was successfully updated."
    else
      redirect_to edit_dictionary_entry_url(@dictionary_entry), inertia: { errors: @dictionary_entry.errors }
    end
  end

  # DELETE /dictionary_entries/1
  def destroy
    @dictionary_entry.destroy!
    redirect_to dictionary_entries_url, notice: "Dictionary entry was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dictionary_entry
      @dictionary_entry = DictionaryEntry.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def dictionary_entry_params
      params.require(:dictionary_entry).permit(:term, :definition, :draft)
    end

    def serialize_dictionary_entry(dictionary_entry)
      dictionary_entry.as_json(only: [
        :id, :term, :definition, :draft
      ])
    end
end
