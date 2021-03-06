class Api::GroupsController < ApplicationController
  before_action :set_group, only: [:destroy]
  def index
    render json: Group.all
  end

  def create 
    group = Group.new(group_params)

    if group.save
      render json: group
    else
      render json: {errors: groups.errors, status: 422}
    end
  end

  def destroy
    render json: @group.destroy
  end

  def get_group_id(name)
    Group.find_by_name(name)
  end

  private
  
  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name)
  end

end
