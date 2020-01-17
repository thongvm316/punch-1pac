class ApplicationQuery
  attr_reader :relation, :params

  def initialize(relation: nil, params: {})
    @relation = relation
    @params   = params
  end

  def execute
    raise
  end
