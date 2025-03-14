class DreamsController < ApplicationController
  allow_unauthenticated_access only: %i[index show]
  before_action :resume_session, only: %i[index show]
  before_action :set_dream, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /dreams
  def index
    @dreams = Dream.all
    render inertia: "Dream/Index", props: {
      dreams: @dreams.map do |dream|
        serialize_dream(dream)
      end
    }
  end

  # GET /dreams/1
  def show
    render inertia: "Dream/Show", props: {
      dream: serialize_dream(@dream)
    }
  end

  # GET /dreams/new
  def new
    @dream = Dream.new
    render inertia: "Dream/New", props: {
      dream: serialize_dream(@dream)
    }
  end

  # GET /dreams/1/edit
  def edit
    render inertia: "Dream/Edit", props: {
      dream: serialize_dream(@dream)
    }
  end

  # POST /dreams
  def create
    @dream = Dream.new(dream_params)

    if @dream.save
      redirect_to @dream, notice: "Dream was successfully created."
    else
      redirect_to new_dream_url, inertia: { errors: @dream.errors }
    end
  end

  # PATCH/PUT /dreams/1
  def update
    if @dream.update(dream_params)
      redirect_to @dream, notice: "Dream was successfully updated."
    else
      redirect_to edit_dream_url(@dream), inertia: { errors: @dream.errors }
    end
  end

  # DELETE /dreams/1
  def destroy
    @dream.destroy!
    redirect_to dreams_url, notice: "Dream was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dream
      @dream = Dream.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def dream_params
      params.require(:dream).permit(:title, :body, :dream_date)
    end

    def serialize_dream(dream)
      dream.as_json(only: [
        :id, :title, :body, :dream_date
      ])
    end
end
